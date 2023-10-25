---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-wedding-moments-be
  namespace: my-wedding-moments-prod
spec:
  selector:
    matchLabels:
      app: my-wedding-moments-be
  replicas: 1
  template:
    metadata:
      labels:
        app: my-wedding-moments-be
    spec:
      containers:
        - image: anhminhbo/my-wedding-moments-be:[[BACKEND_TAG]]
          name: my-wedding-moments-be

          envFrom:
          - configMapRef:
              name: my-wedding-moments-be-cfgmap

          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: my-wedding-moments-be
  namespace: my-wedding-moments-prod
spec:
  ports:
    - port: 8080
      protocol: TCP
  type: ClusterIP
  selector:
    app: my-wedding-moments-be

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-wedding-moments-be
  namespace: my-wedding-moments-prod
  annotations:
    cert-manager.io/cluster-issuer: "cert-manager-global"
    # nginx.ingress.kubernetes.io/configuration-snippet: |
    #   proxy_set_header X-Real-IP $remote_addr;
    #   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #   proxy_set_header X-Forwarded-Proto $scheme; # Adding this for secure https forward to backend
    #   proxy_set_header Host $http_host;

spec:
  ingressClassName: nginx

  tls:
    - hosts:
        - lovemoments-be.bug-fix-squad.com
      secretName: my-wedding-moments-be-private-key
  
  rules:
    - host: lovemoments-be.bug-fix-squad.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-wedding-moments-be
                port:
                  number: 8080
          
