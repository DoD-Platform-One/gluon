# validate-chart

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 12.11.0](https://img.shields.io/badge/AppVersion-12.11.0-informational?style=flat-square)

A Helm chart for Kubernetes

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install validate-chart chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| replicaCount | int | `1` |  |
| image.repository | string | `"registry1.dso.mil/bigbang-ci/cypress-kubectl"` |  |
| image.pullPolicy | string | `"Always"` |  |
| image.tag | string | `""` |  |
| imagePullSecrets[0].name | string | `"private-registry"` |  |
| nameOverride | string | `""` |  |
| fullnameOverride | string | `""` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| securityContext | object | `{}` |  |
| service.type | string | `"ClusterIP"` |  |
| service.port | int | `80` |  |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"2048Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"1024Mi"` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| bbtests.enabled | bool | `true` |  |
| bbtests.scripts.image | string | `"registry1.dso.mil/ironbank/opensource/kubernetes/kubectl:v1.28.7"` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.disableDefaultTests | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
