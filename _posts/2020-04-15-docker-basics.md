---
layout: post
categories: [blog, coding, snippets]
title: "Docker basics"
date: 2020-04-15 14:30
author: J. Pointinger
---

## Login

```sh
$ docker login registry.gitlab.com
```

## Stats for all running containers

```sh
$ docker ps -q | xargs docker stats
```

## Remove dangling (untagged) images

```sh
$ docker rmi $(docker images -f "dangling=true" -q)
```

## Remove "gitlab.com" container

```sh
$ docker rm -f $(docker ps -aq --filter name=registry.gitlab.com*)
```

## Remove "gitlab.com" images

```sh
$ docker rmi $(docker images | grep registry.gitlab.com | awk "{print \$3}")
```

## Remove all stopped containers

```sh
$ docker rm -f $(docker ps -aq --filter status=exited)
```