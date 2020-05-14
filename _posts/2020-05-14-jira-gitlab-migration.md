---
layout: post
categories: [Coding, Snippets, DevOps]
comment_issue_id: 5
title: "Move from Jira to GitLab"
date: 2020-05-14 10:00
image: /assets/images/blog/jira-gitlab-migration.jpg
---

## Motivation

In some of my projects, including my last one, I have to deal with inhomogeneous toolstacks.

Currently we work with tools like Atlassian Confluence, Jira Software, GitLab (CI), AWS and many more. Basically everything is no problem, but little by little the idea arose to combine the planning instrument, to support the agile methodology, with the development. 

The team had problems in the traceability of changes in the source code, there was no or only a rudimentary connection between Jira and GitLab. The important aspect for the management to react to obstacles was missing. There was little feedback from development or the status of the product back to business.

In general I am a friend of documentation directly at the source code and so I often suggest Markdown as a basis - similar to my blog. And so I had the idea to at least put the product specific documentation into GitLab. This thought spread further and the idea to use GitLab completely was born.

GitLab (CI) is one of the best tools available today for continuous integration and continuous delivery/deployment, but is that true for Agile Software Development? Can it stand up to a giant like Jira Software? If I compare the [Agile artifacts](https://about.gitlab.com/blog/2018/03/05/gitlab-for-agile-software-development/) (Epic, User Story, Task, Points and Estimation, Product backlog, Sprint/iteration, Charts, Agile board), GitLab has a solution for all artifacts. So the answer for me is YES - but a long-term study is still pending.

We made the decision to switch from Jira to GitLab for our product. But how do I get the artifacts collected over time in Jira to it?

Well, GitLab offers a rudimentary [import for Jira Ticket](https://docs.gitlab.com/ee/user/project/import/jira.html) starting with version 12.10. The description seems simple, the connection between Jira and GitLab was quickly established, and the import was started with just over 2000 tickets ...

![Import in Progress](/assets/images/blog/jira-import-in-progress.png)

What can I say, it seems that GitLab still has some problems with the import. That's why the import was never finished and there's no way to restart it or stop the old import. According to GitLab support, the feature is fairly new and an MVP. If you're looking for more, you'll find plans on where the feature should go.

- [https://gitlab.com/gitlab-org/gitlab/-/issues/2780](https://gitlab.com/gitlab-org/gitlab/-/issues/2780)
- [https://gitlab.com/gitlab-org/gitlab/-/issues/217395](https://gitlab.com/gitlab-org/gitlab/-/issues/217395)
- [https://gitlab.com/gitlab-org/gitlab/-/issues/214812](https://gitlab.com/gitlab-org/gitlab/-/issues/214812)
- [https://gitlab.com/gitlab-org/gitlab/-/issues/214810](https://gitlab.com/gitlab-org/gitlab/-/issues/214810)
- [https://gitlab.com/gitlab-org/gitlab/-/issues/210580](https://gitlab.com/gitlab-org/gitlab/-/issues/210580)

But what can I do in this situation? Of course, I could hope that the ticket will be fixed relatively quickly and we can continue with the import in a timely manner. But since I still have some developer gene in me, I have decided to write my own importer.

## Jira 2 GitLab

Jira and GitLab each offer good RESTful APIs that don't require much. For more details about the preconditions I refer you directly to the corresponding developer documentation.

Jira: 
- [https://developer.atlassian.com/cloud/jira/software/rest/](https://developer.atlassian.com/cloud/jira/software/rest/)

GitLab:
- [https://docs.gitlab.com/ee/api/](https://docs.gitlab.com/ee/api/)
- [https://docs.gitlab.com/ee/api/api_resources.html](https://docs.gitlab.com/ee/api/api_resources.html)

The following scripts were tested with Jira Cloud and GitLab.com (Cloud) 12.10. For the scripts I used Python3 and locally Python v3.7.3.

## Epics

In GitLab, epics are managed on a group level and should be viewed separately. Epics are used at this level for roadmap planning and can be planned across multiple projects.

> **NOTE** Epics are only available with a `GitLab.com Gold` Subscription.

```python
# import_epics.py
import requests 
from requests.auth import HTTPBasicAuth
import json

## Jira specifics
# Jira URL
JIRA_URL = 'https://your-jira-instance.com/'
# Jira user credentials (incl. API token)
JIRA_ACCOUNT = ('your-jira-username', 'your-jira-api-token')
# Jira project ID (short)
JIRA_PROJECT = 'PRJ'
# Jira Query (JQL)
JQL = 'project=%s+AND+issueType=Epic+AND+resolution=Unresolved+ORDER+BY+createdDate+ASC&maxResults=100' % JIRA_PROJECT

# *False* if Jira / GitLab is using self-signed certificates, otherwhise *True*
VERIFY_SSL_CERTIFICATE = True

# Read Jira Epics
response = requests.get(
  JIRA_URL + 'rest/api/latest/search?jql=' + JQL,
  auth=HTTPBasicAuth(*JIRA_ACCOUNT),
  verify=VERIFY_SSL_CERTIFICATE,
  headers={'Content-Type': 'application/json'}
)

if response.status_code != 200:
  raise Exception("Unable to read Epics from %s!" % JIRA_PROJECT)

jira_issues = response.json()

for issue in jira_issues['issues']:
  print("Import Epic with Jira-Key " + issue['key'])
```

Once you run the script, you should see a similar output:

```bash
$ Import Epic with Jira-Key PRJ-123
$ Import Epic with Jira-Key PRJ-456
```

Now we can start with the transfer of the Jira Epics. For this we use the GitLab API. We need a few more variables for that. The easiest way is to take over title and description from Jira. But for a more complex variant you could also add labels, start and due date or more. See the [GitLab API](https://docs.gitlab.com/ee/api/epics.html#new-epic).

```python

## GitLab specifics
GITLAB_URL = 'https://gitlab.com/'
# GitLab token will be used whenever the API is invoked
GITLAB_TOKEN = 'your-private-gitlab-token'
# GitLab group that you are importing to
GITLAB_GROUP = 'your-group-name'
# GitLab group id.
GITLAB_GROUP_ID = 'your-group-id'

...

for issue in jira_issues['issues']:
  print("Import Epic with Jira-Key " + issue['key'])

  title = issue['fields']['summary']
  description = issue['fields']['description']

  data = { 
    'title': title,
    'description': description
  }

  response = requests.post(
    GITLAB_URL + 'api/v4/groups/%s/epics' % GITLAB_GROUP_ID,
    headers={'PRIVATE-TOKEN': GITLAB_TOKEN},
    verify=VERIFY_SSL_CERTIFICATE,
    data=data
  )
```

> **NOTE** One more point should be mentioned in addition. The Jira API restricts the data sets to a maximum of 100. This has to be solved by pagination if you have more than 100 epics.

You can find the complete source code [here](https://gist.github.com/juergenpointinger/6c6fa147439a2db1608775c2bc37b6b2).

## Issues

If we take the script for the Epics as a basis, we can do the same with other ticket types like Stories, Sub-tasks, Tasks, or Spikes. For this I would like to share some code snippets that might be useful for your import.

### Jira

```python
# Get Jira attachments and comments
requests.get(
  JIRA_URL + 'rest/api/latest/issue/%s/?fields=attachment,comment' % issue['id'],
  auth=HTTPBasicAuth(*JIRA_ACCOUNT),
  verify=VERIFY_SSL_CERTIFICATE,
  headers={'Content-Type': 'application/json'}
)
```

### GitLab

```python
# Get GitLab milestones
requests.get(
  GITLAB_URL + 'api/v4/projects/%s/milestones' % GITLAB_PROJECT_ID,
  headers={'PRIVATE-TOKEN': GITLAB_TOKEN},
  verify=VERIFY_SSL_CERTIFICATE
)
```

```python
# Get GitLab users
requests.get(
  GITLAB_URL + 'api/v4/users',
  headers={'PRIVATE-TOKEN': GITLAB_TOKEN},
  verify=VERIFY_SSL_CERTIFICATE
)
```

```python
# Create new GitLab issue

data = { ... }

repsonse = requests.post(
  GITLAB_URL + 'api/v4/projects/%s/issues' % GITLAB_PROJECT_ID,
  headers={'PRIVATE-TOKEN': GITLAB_TOKEN},
  verify=VERIFY_SSL_CERTIFICATE,
  data=data
)

gl_issue = response.json()
```

```python
# Close GitLab issues that were already closed in Jira
if issue['fields']['status']['statusCategory']['key'] == "done":
  requests.put(
    GITLAB_URL + 'api/v4/projects/%s/issues/%s' % (GITLAB_PROJECT_ID, gl_issue['iid']),
    headers={'PRIVATE-TOKEN': GITLAB_TOKEN},
    verify=VERIFY_SSL_CERTIFICATE,
    data={'state_event': 'close'}
  )
```

## Remove unused GitLab labels

I also created a script to remove unused labels in GitLab. You can find it [here](https://gist.github.com/juergenpointinger/6b34a6def83470a196df7c6beb161858).

## Additional Notes

> **NOTE** With `GitLab.com` you currently do not have the ability to execute SUDO commands. Therefore no user mapping can be done with it. All data is done with the user (private-token) who is also importing the data.

