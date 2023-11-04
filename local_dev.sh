# Fix error in Windows when env variable missing
export NODE_ENV=development


export ROOT_DIR=$(pwd)

### $1 is argument about service name
serviceName=$1

# Check if node modules existed in frontend
if [[ -d "$ROOT_DIR/frontend/node_modules" ]]; then
    echo "Frontend already had node modules, no need to install"
else
    cd $ROOT_DIR/frontend && npm install
fi

# Check if node modules existed in backend
if [[ -d "$ROOT_DIR/backend/node_modules" ]]; then
    echo "Backend already had node modules, no need to install"
else
    cd $ROOT_DIR/backend && npm install
fi

### $1 is argument about service name
serviceName=$1

if [[ "$serviceName" == "backend" ]]; then

    cd $ROOT_DIR/backend && npm run start
    exit 0

fi

# If it is frontend
# Run parallel backend and frontend
cd $ROOT_DIR/backend && npm run start &
cd $ROOT_DIR/frontend && npm start 
