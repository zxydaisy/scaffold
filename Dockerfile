# add image url
# FROM

EXPOSE 4008

RUN sed -i "s/httpredir.debian.org/mirrors.163.com/g" /etc/apt/sources.list && \
    apt-get update && apt-get install -y --no-install-recommends \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

# Avoid first connection host confirmation
RUN mkdir /root/.ssh
RUN ssh-keyscan github.com > /root/.ssh/known_hosts

WORKDIR /app
ADD package.json /app/

# only install the necessary run time dependencies
RUN npm config set registry https://registry.npm.taobao.org && npm install

# Set the default timezone to Shanghai
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# build assets
RUN npm build

CMD ["npm", "start"]
