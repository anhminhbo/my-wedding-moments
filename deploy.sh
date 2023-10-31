#!/bin/bash
PROJECT_ID=$1
CLUSTER_NAME=$2

FE_IMAGE_NAME=$3
BE_IMAGE_NAME=$4

ROOT_DIR=$(pwd)
TPL_DIR=$ROOT_DIR/infra/k8s/templates
DEPLOY_DIR=$ROOT_DIR/infra/k8s

FE_TAG=$(curl -s -S https://registry.hub.docker.com/v2/repositories/$FE_IMAGE_NAME/tags | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)

BE_TAG=$(curl -s -S https://registry.hub.docker.com/v2/repositories/$BE_IMAGE_NAME/tags | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)

# Create backend and frontend manifest
cat $TPL_DIR/backend.yaml.tpl | \
    sed "s/\[\[BACKEND_TAG\]\]/$BE_TAG/g" \
    > $DEPLOY_DIR/backend.yaml

cat $TPL_DIR/frontend.yaml.tpl | \
    sed "s/\[\[FRONTEND_TAG\]\]/$FE_TAG/g" \
    > $DEPLOY_DIR/frontend.yaml

gcloud --project $PROJECT_ID container clusters get-credentials $CLUSTER_NAME --region europe-west6-a

kubectl apply -f $DEPLOY_DIR/backend.yaml &
kubectl apply -f $DEPLOY_DIR/frontend.yaml &

wait

echo "Deploy successfully."