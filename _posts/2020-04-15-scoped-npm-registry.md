---
layout: post
categories: [Coding, Snippets, DevOps]
title: "How to use scoped NPM registry"
date: 2020-04-15 14:30
image: scoped-npm-registry.jpg
author: J. Pointinger
---

## Scoped registry

In most projects it is recommended to use a [scoped](https://docs.npmjs.com/misc/scope) (private) registry to share self-developed modules.

Sometimes it is not possible or makes no sense to use tools like [JFrog Artifactory](https://jfrog.com/artifactory/) or [Sonatype Nexus Repository](https://www.sonatype.com/nexus-repository-oss).

In [GitLab](https://docs.gitlab.com/ee/user/packages/npm_registry/), such registries can now be used relatively easily. 

Add the GitLab NPM Registry to your local or global NPM configuration. Replace `@your-scope` with your specific scope name (e.g. your organization name):

```bash
$ npm config set @your-scope:registry https://gitlab.com/api/v4/packages/npm/
```

Your config output look like this (on Windows):

```text
; cli configs
metrics-registry = "https://registry.npmjs.org/"
...

; userconfig C:\Users\<userprofile>\.npmrc
@your-scope:registry = "https://gitlab.com/api/v4/packages/npm/"
```

Now you just need to authenticate with the newly created scoped registry. Replace `<your_token>` with your personal access token:

```bash
$ npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>"
```

The commands described above change your NPM userconfig, your user specific .npmrc file. If you want to make the change on a global level, you would have to add "--global" at the end.

```bash
$ npm config set @your-scope:registry https://gitlab.com/api/v4/packages/npm/ --global
$ npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>" --global
```

The .npmrc in a global context:

```text
; cli configs
metrics-registry = "https://registry.npmjs.org/"
...

; globalconfig C:\Program Files\nodejs\etc\npmrc
@your-scope:registry = "https://gitlab.com/api/v4/packages/npm/"
```


