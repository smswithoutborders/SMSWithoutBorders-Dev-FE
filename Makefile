


all: config build

config:
	@echo "[!] Creating env configs"
	@${PWD}/scripts/create_env.sh
	@echo "[!] Configs created edit them to suit your needs, then build and deploy"

build:
	@echo "[!] Creating production build ..."
	yarn install
	yarn build

deploy:
	@echo "[!] Deploying built app ..."
	@cp -r build/. /var/www/html/

image: config
	@echo "[!] Creating docker image ..."
	@docker build -t swob-dev-fe --target development .

container:
	@echo "[!] Starting docker container"
	@docker run -itd --name swob-dev-fe -p 18900:80 -p 18901:443 swob-dev-fe
