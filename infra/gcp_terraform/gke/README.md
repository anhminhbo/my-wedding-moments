# How to run GCP GKE infra

- Make sure complete these step before terraform apply

```
terraform init
```

- Remember to Enable compute engine api and container api first, then run these to authenticate terraform to gcloud

```
gcloud init
```

```
gcloud auth application-default login
```

```
gcloud components install gke-gcloud-auth-plugin
```

- To output service account key then go to base64 decode online then json to one liner online, and copy that json to Github action

```
terraform output kubernetes-service-account-secret-key
```
