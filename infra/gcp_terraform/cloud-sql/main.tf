module "mysql-db" {
  source           = "GoogleCloudPlatform/sql-db/google//modules/mysql"
  version          = "8.0.0"
  db_name          = var.name
  name             = var.name
  database_version = "MYSQL_8_0"
  project_id       = var.project_id
  zone             = var.location
  region           = var.region
  tier             = var.tier
  disk_size        = var.disksize

  deletion_protection = "false"

  ip_configuration = {
    ipv4_enabled        = true
    private_network     = null
    require_ssl         = false
    allocated_ip_range  = null
    authorized_networks = var.authorized_networks
  }


  database_flags = [
    {
      name  = "log_bin_trust_function_creators"
      value = "on"
    },
  ]
}
