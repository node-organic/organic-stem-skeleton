useradd -d /home/node -m node -s /bin/bash
passwd node
adduser node sudo
apt-get -y install git-core g++ curl libssl-dev apache2-utils make nginx
