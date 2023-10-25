#!/bin/bash
ROOT_DIR=$(pwd)
FE_DIR=$ROOT_DIR/frontend
BE_DIR=$ROOT_DIR/backend

FE_IMAGE_NAME=anhminhbo/my-wedding-moments-fe
BE_IMAGE_NAME=anhminhbo/my-wedding-moments-be


FE_TAG=""
BE_TAG=""

# Check if the first argument is empty
# Process command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --fe-tag)

      if [[ $2 == "--be-tag" ]];then
        FE_TAG=""
      else
        FE_TAG=$2
        shift
      fi

      shift

      ;;
    --be-tag)
      BE_TAG="$2"
      break
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done


# Function to build and push Docker image
build_and_push_image() {
    local image_name="$1"
    local tag="$2"
    local dir="$3"

    # Build Docker image
    DOCKER_BUILDKIT=1 docker build -t $image_name:$tag $dir

    # Push Docker image to Docker Hub
    docker push $image_name:$tag
}

# BE and FE both have changes
if [[ ! -z "$BE_TAG" && ! -z "$FE_TAG" ]]; then
    
    # Build and push images in parallel using background processes
    (build_and_push_image "$FE_IMAGE_NAME" "$FE_TAG" "$FE_DIR" && echo "$FE_IMAGE_NAME finished") &
    (build_and_push_image "$BE_IMAGE_NAME" "$BE_TAG" "$BE_DIR" && echo "$BE_IMAGE_NAME finished") &

    # Wait for both background processes to finish
    wait
fi

# Only BE
if [[ ! -z "$BE_TAG" && -z "$FE_TAG" ]]; then

    build_and_push_image "$BE_IMAGE_NAME" "$BE_TAG" "$BE_DIR"

fi

# Only FE
if [[ -z "$BE_TAG" && ! -z "$FE_TAG" ]]; then

    build_and_push_image "$FE_IMAGE_NAME" "$FE_TAG" "$FE_DIR"

fi

echo "Build and push completed."
