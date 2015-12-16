useradd -d /home/node -m node -s /bin/bash
passwd node
adduser node sudo
apt-get -y install git-core g++ curl libssl-dev apache2-utils make nginx
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org
