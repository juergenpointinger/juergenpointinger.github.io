---
layout: post
categories: [ DevOps, Flyway, Docker ]
comment_issue_id: 2
title: "How to use Flyway with Docker"
date: 2020-04-16
image: /assets/images/blog/use-flyway-with-docker.jpg
---

## Flyway and Docker

If we think about a migration of databases, the analysis will probably not get past [Flyway](https://flywaydb.org/).

Flyway has focused on exactly one task and in this area I think they are doing a very good job.

The Community Edition comes with a good set of features. For the development in the [Postgres](https://flywaydb.org/documentation/database/postgresql) area this seems to be sufficient, especially in the beginning. It is important to note the "Guaranteed database support timeline". The Community Edition comes with a 5-year guarantee. Currently this would mean the following for Postgres.

Supported versions: 12, 11, 10, 9.6, 9.5, 9.4 
The Enterprise Edition would extend support to these versions: 9.3, 9.2, 9.1, 9.0

As soon as you think about [Oracle PL*SQL](https://flywaydb.org/documentation/database/oracle#sqlplus-commands) and want to use it in your project, there is no way around a Pro or Enterprise Edition.

As soon as you have decided on a version, it is time to prepare your first "migration".

Of course you can download Flyway with its cross-platform capability to your system and use the CLI of it. 

However, I would suggest to use a [dockerized](https://hub.docker.com/r/flyway/flyway/) version right away. The advantage is that you can reuse this approach later in a Continuous Integration / Delivery Pipeline.

The `info` CLI command prints the details and status information about all the migrations.

```bash
flyway/flyway info
```

Flyway also supports different [JDBC drivers](https://flywaydb.org/documentation/commandline/#jdbc-drivers), if these should not be sufficient, e.g. with Oracle (ojdbc8), then one can simply reinstall the drivers or tell Flyway where the drivers can be found.

A list of useful CLI commands can be found [here](https://flywaydb.org/documentation/commandline/).

Flyway can be used quite nicely as a build image as well and it is almost as easy as using the CLI directly.

```bash
$ docker pull flyway/flyway:6-alpine
$ docker run --rm -v ${pwd}/sql:/flyway/sql flyway/flyway:6-alpine -url=jdbc:postgresql://<HOST>/<DBNAME> -user=<USER> -password=<PASSWORD> info
```

Instead of downloading the Flyway executable file manually, you can download the Docker image by 'docker pull' as shown above. Of course you have to tell Flyway where to find the scripts, which you can easily do with volumes. It is also necessary to establish a connection to the database. After that the respective CLI command can be used.

If we get along with the standard JDBC drivers, we can stop here. However, if other drivers are needed, I recommend to create your own Docker image with the appropriate driver pre-installed and possibly even a license defined. 

How this works can be seen afterwards:

```dockerfile 
## Base: https://github.com/flyway/flyway-docker
FROM flyway/flyway:latest-alpine

LABEL maintainer="juergenpointinger" \
      description="This is a build container image to interact with Flyway"

## Supported Volumes
# /flyway/conf: Directory containing a flyway.conf configuration file
# /flyway/drivers: Directory containing the JDBC driver for your database
# /flyway/sql: The SQL files that you want Flyway to use (for SQL-based migrations)
# /flyway/jars: The jars files that you want Flyway to use (for Java-based migrations)
VOLUME [ "/flyway/conf","/flyway/drivers", "flyway/sql", "flyway/jars" ]

# Use specific Oracle JDBC driver
COPY ojdbc8.jar "/flyway/drivers"

## Flyway Edition
# community: Select the Flyway Community Edition (default)
# pro: Select the Flyway Pro Edition
# enterprise: Select the Flyway Enterprise Edition
ENV FLYWAY_EDITION=community
```

Afterwards the newly created image can be used just like the original Flyway image. Have fun with Flyway.