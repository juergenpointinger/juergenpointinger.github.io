---
layout: post
categories: DevOps Management3.0
comment_issue_id: 8
title: "DevOps Frameworks"
date: 2020-07-24
image: /assets/images/blog/devops-frameworks.jpg
---

## Culture, Automation, Lean, Measurement and Sharing

In my last article about [Why do we need DevOps?](/why-do-we-need-devops) I already mentioned a framework that can be used to introduce DevOps in an organization - **CALMS**. 

The CALMS framework was originally invented by _Jez Humble_, co-author of _"The DevOps Handbook"_ and _"Accelerate"_. It is used as a means to assess whether an organization is ready to adopt DevOps processes or how an organization is progressing in its DevOps transition.

The acronym stands for Culture, Automation, Lean, Measurement and Sharing.

Although this is my preferred way to assess, the approaches **"The Tree Ways"**, described in _"The Phoenix Project"_ or _"The DevOps Handbook"_ and **"Mature capabilities in technical and management practices"** found in high-performing DevOps teams, based on the research presented in "Accelerate" are also mentioned.

Nevertheless, I would like to talk a bit more about the CALMS framework. 

### What DevOps is NOT

But before I do that, I would like to clarify what DevOps is NOT from my perspective by some debates in my nearer past. I have already mentioned some of these in passing in my last article. However, I would like to emphasize it clearly once again:

- **DevOps is not the simple combination of Development and Operations teams:** _"We turn the development and operations team into a team - and voila we make DevOps."_ If it were that simple, this article would lose its meaning.
- **DevOps is not a tool:** Even though harmonizing and finding the right toolstack may be important for the corresponding product development.
- **DevOps is not a separate team:** It may seem at the beginning of a transition as if a test balloon in a separately formed team would be easier. At the end of these balloon, this should no longer be an option for an organization and in the best case it has also shown that it can only work if DevOps is practiced in a team.
- **DevOps is not a one-size-fits-all solution:** There are so many business drivers and product development approaches. To suggest that the specific needs of a client can be met with one and the same solution is ridiculous.
- **DevOps is not Cloud:** I often hear DevOps in connection with cloud and the opinion that DevOps is the synonym for _"Everything in the cloud"_. Of course it's not, there are a lot of businesses that are hard to do in the cloud, but DevOps works great there anyway.
- **DevOps is not automation:** Automation is often used interchangeably with DevOps. This is of course complete nonsense. A part of DevOps is also automation, as we will see in the following article. To find out what DevOps really is I recommend my article about [Why do we need DevOps?](/why-do-we-need-devops)

And there is one point which, for my personal conviction, must be mentioned. I say it frankly and I stand by it: **"DevOps is not a role"**

## CALMS

### Culture

Behind the aspect of **Culture**, which occurs in all three approaches, hides a complex problem which in many cases is also the main reason for the failure of a product development. 

![Culture](/assets/images/blog/culture.jpg)

Before thinking about breaking down silos in an organization, a **common view of the entire system** and **common targets** should be in place and a foundation for a **common responsibility** should be laid. This is key if you want to be successful.

In most cases a common **team vision and mission** can be helpful and is one of the things that can make the difference. There are of course different approaches to developing these, but what is needed is trust, not only the trust of the team members themselves, but also the trust of management in the journey of DevOps and the ROI that comes with it.

To be able to **destroy silos**, cooperation must be encouraged. From the history the developers want to get new features into production as soon as possible. But in operation it's more about being able to run the system as stable and sustainable as possible and not to endanger the stability by changes that have possibly hardly been tested. Thus the two statements from the history stand in contrast to each other. Which in some cases can lead to points of friction in communication. Which I will not go into here, I think you know the points of discussion.

That's why it's important to get everyone involved as early as possible and create a _"You build it, you run it, you own it"_ mentality. The way a system is operated finally has an impact on the architecture and on the cooperation between components. If a system cannot be operated, it is ultimately doomed to failure.

Products where all parties involved have an open and encouraging communication culture are also the products that will be on the market in the coming years, other products have already disappeared due to lack of maintainability and many other aspects.

With the open culture comes **transparency** in communication. Successes as well as failures are part of this culture and are celebrated one way or another. **Failures lead us to improve** in what we do and to continuously work on ourselves, to learn something new and to improve our processes, our daily work. 

Even though sharing successes and failures are actually more part of [Sharing](#sharing), they are deeply rooted in the culture. Teams that are not familiar with this culture can slowly be introduced to these aspects through games and a lot of motivation. Decisive for this is a non-blaming culture and the open discussion, the open ear of the team members and management.

Herewith I am approaching the end of the cultural aspect, even if there is still a lot to tell, to be fair. The last point I would like to mention is the topic of team structure or team constellation. 

I have seen many companies that always seemed to be seeking the same stereotypes and thus inevitably created one-dimensional thinking. But to be successful, you need **different types** in a team. This does not start at seniority level (junior, professional, senior). It is an advantage to have **different skill sets** in one team. What I want to create are **cross-functional teams** that cover the complete software development life cycle and thus represent the non-plus-ultra for my system.

What it does not mean is that a team should only contain specialists and hard-to-manage individualists. It should mean that in order to develop successful products, it needs not only specialists in their field of expertise, but also generalists who can possibly cover one or more main areas of the SDLC.

### Automation

To put it simply, DevOps teams should strive to **automate as many manual and recurring tasks as possible**. Attention should always be paid to stability, maintainability and simplicity. There are a few points that can be addressed under the main topic of automation. Each of the following principles separately fills whole articles and books, so I would have liked to mention them but will not go into all of them in detail:

![Automation](/assets/images/blog/automation.jpg)

- **Automate the build process:** Here we should name _Continuous Integration_ as THE principle they should adopt. This includes the right branching strategy as well as automated versioning (e.g.: _Semantic Versioning_), but of course most of all the automated building of the solution to be able to use a build artifact for further steps.
- **Automate the testing process:** There are myths surrounding the testing process within DevOps. Is it a closed process within an SDLC? No. What is sufficient test coverage? Depends. Should we work on our unit tests and do we need integration tests at all? Definitely. Is the feature user friendly and client led? I don't know. Are our test cases good and fast enough for our pipeline? Probably not. - What am I trying to say? Continuous Quality is a holistic concept that starts with the writing of user stories and ends with the involvement of the client in the process ... or even goes beyond that. To make a product successful, you should always try to implement quality where you can. Is 20% unit test coverage sufficient? Probably not, if the product is used for more than 3 months. But does it need a coverage of around 100%? Probably not, if no lives depend on it. I could fill pages on quality, but I think we can leave it at one sentence: _We need quality and quality assurance in our system so it doesn't steal our sleep at the end of the day._
- **Automate the infrastructure setup process:** _Infrastructure as Code (IaC)_ with the probably well known tools like Ansible, Chef, Terraform, Puppet, Kubernetes or similar, are part of it as well as approaches of GitOps.
- **Automate the deployment or release process:** Not only do principles such as _Continuous Delivery or Deployment_ play a major role in this, but there are also issues that are perhaps not so obvious at first glance. These include the automation of a changelog, release notes, archiving artifacts for the necessary traceability and recovery in case of a pitfall.
- **Automate the security process:** It starts with static code analysis and ends with compliance policies. In the middle we deal with topics such as Dynamic Application Security Testing (DAST), Static Application Security Testing (SAST), Dependency scanning, Container scanning or Secret detection.
- **Automate the monitoring process:** Already at the beginning of the development of a product you should, as mentioned, think about how you want to operate it, but not only that. Besides monitoring the infrastructure, you also have to think about possible application-specific things. Log-file analysis or even more specifically, the correct writing of log output is essential. Also the feedback from clients or the collection of data from A/B or feature tests is an important part of monitoring that should be considered.

> _Automate the ... boring stuff_

### Lean

Development teams use lean principles to **eliminate waste** by defining the client value and understand what value is, optimize the value stream, such as **minimizing working in progress (WIP)**, **making work and progress visible** and traceable, **reducing handover complexity** and breaking down steps to ensure that the flow of the remaining steps run smoothly without interruptions and waiting times. This also includes the introduction of cross-functional teams and the training of employees who are versatile and adaptable.

### Measurement

In order to better understand the possibilities of the current system it is helpful to get some things settled. In order to better assess the **health of the product**, I need well-considered metrics that can give us a starting point for improvement.

In this area we try to collect and analyse data. This can be planning data, product data, quality data or more general team data. It is important to mention that this is always about trust and we plead for the data to be used correctly in the right hands. We do not want to create a surveillance state, we want to get the best out of it for our clients and our product.

![Monitoring](/assets/images/blog/monitoring.jpg)

As mentioned, **Continuous Learning and Improvement** should be a key factor in our DevOps culture. A nice saying that I like to use myself is _"Continuous Improvement is the only Constant in DevOps"_

So what do we want to achieve:

- Collect & analyze product and system specific data
- Define metrics and thresholds
- Monitor and track metrics and automate notifications
- Identify mistakes
- Define quality gates
- Create a Continuous Learning and Improvement culture
- Improve efficiency and reduce cycle times

### Sharing

Classically, this includes **establishing a non-blaming culture**, which sounds simple at first glance, but which, as I have learned, is apparently in our nature to reject fault. It requires a lot of experience and understanding and the management should lead by example.

An **open communication** culture should **encourage the ask/share** principle. We want to focus on solving difficulties and not on assigning blame. In this sense, it should also be emphasized that it is always about the overall system and not about micro-problems without looking at the other areas.

We can achieve this by focusing on **Collective Code Ownership** and by putting the team in focus. All in all - _"Sharing is caring"_ and we should always keep this in mind. If we don't care about the team and the product, why should our clients?

I am eager to hear your opinion and welcome any comments on this topic. So long - stay tuned and healthy!