---
layout: post
categories: [Coding, Snippets]
comment_issue_id: 3
title: "Useful Docker commands"
date: 2020-04-15 14:30
author: J. Pointinger
---

## Login

```bash
$ docker login registry.gitlab.com
```

## Stats for all running containers

```bash
$ docker ps -q | xargs docker stats
```

## Remove dangling (untagged) images

```bash
$ docker rmi $(docker images -f "dangling=true" -q)
```

## Remove "gitlab.com" container

```bash
$ docker rm -f $(docker ps -aq --filter name=registry.gitlab.com*)
```

## Remove "gitlab.com" images

```bash
$ docker rmi $(docker images | grep registry.gitlab.com | awk "{print \$3}")
```

## Remove all stopped containers

```bash
$ docker rm -f $(docker ps -aq --filter status=exited)
```