---
layout: post
category: Code & Snippets
comment_issue_id: 3
title: "Docker Cheat Sheet"
date: 2020-04-15 14:30
image: /assets/images/blog/useful-docker-commands.jpg
---

## Cheat Sheet

To make it easier for me, I started some time ago to create a cheat sheet for Docker. Since I don't want to keep this knowledge only for myself, I share some of the most important CLI commands I need in my daily do-ing.

## Login

When you start to deal with continuous integration tools, you quickly get to the point where you also use a private container registry. 

Docker provides a very simple way to use a registry and log in with your credentials:

```bash
$ docker login registry.gitlab.com
```

To make the docker login command non-interactive, such as required for GitLab CI, you can set the `--password-stdin` flag to provide a password via `STDIN`.

Using `STDIN` prevents the password from ending up in the shell's history or log files.

```bash
$ echo "${CI_REGISTRY_PASSWORD}" | docker login -u "${CI_REGISTRY_USER}" "${CI_REGISTRY}" --password-stdin
```

## System health

In order to check the current Docker Disk Usage and thus the allocation of the system a simple command

```bash
$ docker system df
```

## Purging all unused or dangling Images, Containers, Volumes, and Networks

Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

```bash
$ docker system prune
```

To additionally remove any stopped containers and all unused images (not just dangling images), add the -a flag to the command:

```bash
$ docker system prune -a
```

## Removing Docker Images

### Removing dangling (untagged) Images

Docker images consist of multiple layers. Dangling images are layers that have no relationship to any tagged images. They no longer serve a purpose and consume disk space. They can be located by adding the filter flag, `-f` with a value `of dangling=true` to the docker images command. When you’re sure you want to delete them, you can use one of the following commands:

```bash
$ docker rmi $(docker images -f "dangling=true" -q)
```

or

```bash
$ docker image prune
```

> **NOTE:** If you build an image without tagging it, the image will appear on the list of dangling images because it has no association with a tagged image.

### Removing specific Images by Pattern

Sometimes it is necessary to search an image for a certain `<<pattern>>`. A combination of Docker CLI and `grep` can help.

```
$ docker images -a |  grep "<<pattern>>"
```

If you are comfortable with the search/filter, you can use 'awk' to pass the IDs to the Docker CLI:

```bash
$ docker image rm $(docker images -a | grep "<<pattern>>" | awk '{print $3}')
```

or

```bash
$ docker images -a | grep "<<pattern>>" | awk '{print $3}' | xargs docker image rm
```

> **NOTE:** Instead of `image rm` you could use the shorter version with `rmi`

### Removing all Images

Also the deletion of all images can be solved with the Docker CLI. To do this, you can simply append `-a` to the command. `-q` returns the Image ID, which can be used to pass it on to other commands.

```bash
$ docker image rm $(docker images -a -q)
```

or

```bash
$ docker image rm $(docker image ls -q)
```

## Removing Docker Containers

Similar to the `docker images` command, you can also add the parameter `-a` to the `docker ps` command, which lists the running containers, so that all containers are shown, even those that are no longer running.

The displayed container ID or name can then be reused:

```bash
$ docker container rm <<container_id/name>>
```

It is also possible to display only the exited containers:

```bash
$ docker ps -a -f status=exited
```

## Removing specific Containers by Pattern

<!-- ```bash
$ docker container rm -f $(docker ps -aq --filter name=registry.gitlab.com*)
``` -->

And similar to the images it works with the containers.

```bash
$ docker container rm $(docker ps -a | grep "<<pattern>>" | awk '{print $1}')
```

or

```bash
$ docker ps -a | grep "<<pattern>>" | awk '{print $1}' | xargs docker container rm
```

> **NOTE:** In this case `{print $1}` returns the ID of the container.

## Removing all stopped Containers

With the knowledge we have just gained, we can now simply delete all the containers that have exited. 

```bash
# Historical command
$ docker rm -f $(docker ps -aq -f status=exited)
```

or

```bash
$ docker container prune
```

> **NOTE:** We again only pass the ID to the Docker CLI using `-q`.

## Removing all Containers

If we need to remove all containers, the running ones and the stopped ones we can use the following command.

```bash
$ docker container rm -f $(docker container ls -aq)
```

## Removing all Volumes

To remove the volumes not used any longer, we can use.

```bash
$ docker volume rm $(docker volume ls -q)
```

or

```bash
$ docker volume prune
```

## Removing all Builder cache

To remove the build cache, we can use.

```bash
$ docker builder prune
```

## Stats for all running Containers

The `docker stats` command is used to display a live stream of container resource usage statistics. This command can be extended to display the statistics of all containers simultaneously.

```bash
$ docker ps -q | xargs docker stats
```