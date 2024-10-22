# Wait Job Templates
The library supports a wait-job template for waiting on specific conditions before proceeding with further steps. This template is useful for scenarios where certain resources or conditions need to be met before continuing with the deployment. The wait-job template is described below along with examples of how to implement it.

You will need to set the `waitjob.enabled` toggle to true in your package `values.yaml` file so that the wait-jobs are deployed.

```yaml
waitjob:
  enabled: true
```

## Wait-Job

To include the templates for the wait-job, you will need to create a file called `test-wait-job.yaml` under `chart/templates/test` which includes the content below:

```yaml
{{- include "gluon.wait.wait-job-configmap.overrides" (list . "gluon-wait.wait-configmap") }}
{{- define "gluon-wait.wait-configmap" }}
{{- end }}
---
{{ include "gluon.wait.wait-job.overrides" (list . "gluon-wait.wait-job") }}
{{- define "gluon-wait.wait-job" }}
{{- end }}
---
{{ include "gluon.wait.wait-job-sa.overrides" (list . "gluon-wait.wait-job-sa") }}
{{- define "gluon-wait.wait-job-sa" }}
{{- end }}
---
{{ include "gluon.wait.wait-job-role.overrides" (list . "gluon-wait.wait-job-role") }}
{{- define "gluon-wait.wait-job-role" }}
{{- end }}
---
{{ include "gluon.wait.wait-job-rolebinding.overrides" (list . "gluon-wait.wait-job-rolebinding") }}
{{- define "gluon-wait.wait-job-rolebinding" }}
{{- end }}
```

This will work for a "base" install, but if you want to override anything (example below shows how to add labels), you can include different templates and create package-specific templates with the overrides:

```yaml
{{- include "gluon.wait.wait-job-configmap.overrides" (list . "custom-wait.wait-configmap") }}
{{- define "custom-wait.wait-configmap" }}
metadata:
  labels:
    {{ include "custom.labels" . | nindent 4 }}
{{- end }}
---
{{ include "gluon.wait.wait-job.overrides" (list . "custom-wait.wait-job") }}
{{- define "custom-wait.wait-job" }}
metadata:
  labels:
    {{ include "custom.labels" . | nindent 4 }}
{{- end }}
---
{{ include "gluon.wait.wait-job-sa.overrides" (list . "custom-wait.wait-job-sa") }}
{{- define "custom-wait.wait-job-sa" }}
metadata:
  labels:
    {{ include "custom.labels" . | nindent 4 }}
{{- end }}
---
{{ include "gluon.wait.wait-job-role.overrides" (list . "custom-wait.wait-job-role") }}
{{- define "custom-wait.wait-job-role" }}
metadata:
  labels:
    {{ include "custom.labels" . | nindent 4 }}
{{- end }}
---
{{ include "gluon.wait.wait-job-rolebinding.overrides" (list . "custom-wait.wait-job-rolebinding") }}
{{- define "custom-wait.wait-job-rolebinding" }}
metadata:
  labels:
    {{ include "custom.labels" . | nindent 4 }}
{{- end }}
```

Next, include values that would be needed for the wait-jobs in your `chart/values.yaml` file in the waitJob: section. There are several values you will want to consider:
### Wait-Job Configuration Values

The following values can be configured for the wait-job in your `chart/values.yaml` file:

- `waitjob.scripts.image`: This defines the container image to be used for running scripts in the wait-job. 
- `waitjob.permissions.apiGroups`: This defines the API groups that the wait-job should have access to. This should be a list of API groups.
- `waitjob.permissions.resources`: This defines the resources that the wait-job should have access to. This should be a list of resources.

A sample is included below:

```yaml
waitJob:
  enabled: true
  scripts:
    image: registry1.dso.mil/ironbank/opensource/kubernetes/kubectl:v1.29.6
  permissions:
    apiGroups:
     - minio.min.io
     - minio.min.io/v2
    resources:
     - tenants
     - tenant
     - tenants.minio.min.io
```

### Wait script
Finally, add your `wait.sh` script to the `templates/wait` folder. This file will contain the wait conditions for you specified resources.

Your final directory structure and files should look like this:

## Directory Structure

```
.
├── chart
   ├── Chart.yaml (which includes the library dependency)
   ├── templates
   │   └── tests
   │       └── test-wait-job.yaml (which uses the library templates)
   └── wait
       ├── wait.sh (contains custom wait script to check for specified resources)
```

By following the above steps, you can implement and configure wait-jobs in your Helm charts to ensure that specific conditions are met before proceeding with further steps in your deployment.
