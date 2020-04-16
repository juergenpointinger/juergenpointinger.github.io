---
layout: post
categories: [blog, coding, snippets]
title: "How to use scoped NPM registry"
date: 2020-04-15 14:30
author: J. Pointinger
---

In most projects it is recommended to use a [scoped](https://docs.npmjs.com/misc/scope) (private) registry to share self-developed modules.

Sometimes it is not possible or makes no sense to use tools like [JFrog Artifactory](https://jfrog.com/artifactory/) or [Sonatype Nexus Repository](https://www.sonatype.com/nexus-repository-oss).

In [GitLab](https://docs.gitlab.com/ee/user/packages/npm_registry/), such registries can now be used relatively easily. 

Add the GitLab NPM Registry to your local or global NPM configuration. Replace `@your-scope` with your specific scope name (e.g. your organization name):

```sh
$ npm config set @your-scope:registry https://gitlab.com/api/v4/packages/npm/ --global
```

Now you just need to authenticate with the newly created scoped registry. Replace `<your_token>` with your personal access token:

```sh
$ npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>" --global
```