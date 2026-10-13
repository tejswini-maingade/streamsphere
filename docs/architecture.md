# StreamSphere Architecture

Target architecture. Components are introduced phase by phase, starting with the local version.

```mermaid
flowchart LR
    User["Viewer / Creator browser"]

    subgraph App["Application"]
        FE["React frontend"]
        API["Node.js Express API"]
        WK["FFmpeg worker"]
    end

    subgraph Data["Data and storage"]
        DB[("PostgreSQL")]
        S3[("S3 private bucket")]
        Q["SQS queue"]
        CF["CloudFront"]
    end

    subgraph Platform["Delivery platform"]
        GH["GitHub Actions"]
        ECR["ECR images"]
        Argo["Argo CD"]
        K8s["EKS Kubernetes"]
        TF["Terraform"]
    end

    subgraph Obs["Observability"]
        Prom["Prometheus"]
        Graf["Grafana"]
    end

    User --> FE
    FE --> API
    API --> DB
    API -->|"presigned upload URL"| S3
    User -->|"upload video"| S3
    API -->|"enqueue job"| Q
    Q --> WK
    WK -->|"read and write video"| S3
    WK -->|"update status"| DB
    S3 --> CF
    CF -->|"stream published videos"| User

    GH -->|"test, scan, build"| ECR
    GH -->|"update manifests in Git"| Argo
    Argo -->|"sync"| K8s
    ECR --> K8s
    TF -->|"provisions"| K8s
    TF -->|"provisions"| S3
    K8s -.->|"runs"| API
    K8s -.->|"runs"| WK

    Prom -->|"scrapes metrics"| API
    Prom --> WK
    Graf --> Prom
```

## Build order

1. Local: React, Express, PostgreSQL, local file storage, worker.
2. Docker Compose for all services.
3. CI/CD and security scanning.
4. AWS via Terraform: S3, ECR, RDS, SQS, CloudFront, EKS.
5. Helm, Argo CD, monitoring.