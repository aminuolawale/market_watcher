rebuild-and-start:
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

venv:
	pip3 install virtualenv==20.13.1 && virtualenv .venv -p /usr/bin/python3

precommit:
	pre-commit install
