variable "project_id" {
  description = "The project ID to host the cluster in"
  type        = string
  default     = "composite-fire-396311"
}

variable "name" {
  description = "name of the kubernetes cluster"
  type        = string
  default     = "minh-cloud-sql-mysql"
}

variable "region" {
  description = "The region to host the cluster in"
  type        = string
  default     = "europe-west6"
}


variable "location" {
  description = "location for k8s cluster"
  type        = string
  default     = "europe-west6-a"
}


variable "disksize" {
  description = "Disk Size in GB"
  default     = 10
}

variable "tier" {
  description = "location for k8s cluster"
  type        = string
  default     = "db-custom-2-4096"
}

variable "authorized_networks" {
  default = [{
    name  = "nat public IP of GKE"
    value = "34.65.112.46/32"
    },
    {
      name  = "Allow all"
      value = "0.0.0.0/0"
    },
  ]
  type        = list(map(string))
  description = "List of mapped public networks authorized to access to the instances. Default - short range of GCP health-checkers IPs"
}
