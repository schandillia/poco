up: clean-docker build-and-run

clean-docker:
	docker system prune -f
	docker builder prune -f
	docker rm -vf $(docker ps -aq)
	docker rmi -f $(docker images -aq)

build-and-run:
	clear
	docker-compose up --build
