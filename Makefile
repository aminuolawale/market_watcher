rebuild-and-start:
	docker-compose up --build 

start:
	docker-compose up

make_migrations:
	docker-compose  run web python manage.py make_migrations

migrate:
	docker-compose  run web python manage.py migrate

startapp:
	docker-compose run web python manage.py startapp $(appname)
