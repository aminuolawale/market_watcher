PROJECT_NAME := market-watcher
PROJECT_ID := market-watcher-341109
REGION := europe-central2
COMPUTE_ZONE := europe-central2-a
LIGHTSAIL_SSH_KEY_PATH := ./LightsailDefaultKey-eu-central-1.pem
LIGHTSAIL_OS := ubuntu
LIGHTSAIL_STATIC_IP := 18.192.141.187



echo-vars:
	echo PROJECT_NAME = ${PROJECT_NAME} && echo PROJECT_ID =  ${PROJECT_ID} && echo REGION = ${REGION} && echo COMPUTE_ZONE = ${COMPUTE_ZONE}

rebuild-and-start:`
	docker-compose up --build

start:
	docker-compose up

migrations:
	docker-compose  run web python manage.py makemigrations

migrate:
	docker-compose  run web python manage.py migrate $(appname) $(node)

startapp:
	docker-compose run web python manage.py startapp $(appname)

ishell:
	docker-compose  run web python manage.py shell -i ipython

shell:
	docker-compose  run web python manage.py shell

createsuperuser:
	docker-compose  run web python manage.py createsuperuser

precommit:
	pip3 install pre-commit==2.17.0 && pre-commit install

grant-permissions-on-lightsail-key:
	sudo chmod 600 ${LIGHTSAIL_SSH_KEY_PATH}

ssh-lightsail:
	ssh -i ${LIGHTSAIL_SSH_KEY_PATH} ${LIGHTSAIL_OS}@${LIGHTSAIL_STATIC_IP}

install-docker:
	sudo apt update && sudo apt install apt-transport-https ca-certificates curl software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt update && apt-cache policy docker-ce && sudo apt install docker-ce && sudo systemctl status docker

install-docker-compose:
	sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && docker-compose --version

export-PROJECT_ID:
	export PROJECT_ID=${PROJECT_ID}

push-images:
	docker-compose push
set-project:
	gcloud config set project ${PROJECT_ID}

create-artifact-repo:
	gcloud artifacts repositories create ${PROJECT_NAME} \
   --repository-format=docker \
   --location=${REGION} \
   --description="Docker repository for ${PROJECT_NAME}"

install-compose:
	brew install kompose

set-compute-zone:
	gcloud config set compute/zone ${COMPUTE_ZONE}

create-gke-cluster:
	gcloud container clusters create ${PROJECT_NAME}-cluster

get-gke-nodes:
	kubectl get nodes

kompose-convert:
	kompose convert -f docker-compose.yaml && make move-yamls

move-yamls:
	mv ./{celery*.yaml,web*.yaml,db*.yaml,env*.yaml,redis*.yaml} ./deployments

kube-apply-yamls:
	cd ./deployments && kubectl apply -f celery-beat-claim0-persistentvolumeclaim.yaml,celery-beat-deployment.yaml,celery-claim0-persistentvolumeclaim.yaml,celery-deployment.yaml,db-claim0-persistentvolumeclaim.yaml,db-deployment.yaml,env-configmap.yaml,redis-deployment.yaml,web-claim0-persistentvolumeclaim.yaml,web-deployment.yaml,web-tcp-service.yaml && cd ..

kube-describe:
	kubectl describe svc web

check-cluster:
	gcloud container clusters get-credentials ${PROJECT_NAME}-cluster --zone ${COMPUTE_ZONE}

expose-cluster:
	kubectl expose deployment web --name=${PROJECT_NAME}-service --type=LoadBalancer --port 80 --target-port 8000

get-deployments:
	kubectl get deployments

get-pods:
	kubectl get pods

scale-deployment:
	kubectl scale deployment celery-beat --replicas=3

horizontal-scale-deployment:
	kubectl autoscale deployment celery-beat --cpu-percent=80 --min=1 --max=5
