# Spring Microservices Project

![Prohect Diagram](/images/project-diagram.png)

This repository contains project showcasing a microservices-based application, designed to provide a hands-on understanding of microservices architecture and implementation. The project consists of an API Gateway, Config Server, Discovery Server, and two microservices: Student and School.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Components](#project-components)
    - [API Gateway](#api-gateway)
    - [Config Server](#config-server)
    - [Discovery Server](#discovery-server)
    - [Auth Server](#auth-server)
    - [Student Microservice](#student-microservice)
    - [School Microservice](#school-microservice)
    - [Client Application](#client-application)
- [Inter-Service Communication](#inter-service-communication)
    - [Using OpenFeign](#using-openfeign)
- [Distributed Tracing](#distributed-tracing)
    - [Using Zipkin](#using-zipkin)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Getting Started

Follow the instructions below to set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your system before proceeding:

- Java Development Kit (JDK) 17 or later
- Maven
- Docker

### Installation

1. Clone the repository
2. In the main project folder run command: 

``` ./start-all ```

> [!NOTE]
> Important: Rmember, you need to start Docker Engine before running above command. 


## Project Components

### KeyCloak Admin

1 - You can login as Admin to keycloak using:
>**URL:** `http://localhost:9090/` \
>**Username/Password:** `admin`

2 - Create Realm:\
**name:** `microservice`

3 - Create Client:\
`frontend`

Add Following details for Client:
![](/images/keycloak-details.png)


### Auth Server

We are using KeyCloak in Auth Server. It supports OpenID Connect (OIDC), a protocol built on OAuth 2.0 for authentication and authorization. OIDC allows applications to verify user identities and obtain profile information in a secure manner.

### API Gateway

The API Gateway serves as the single entry point for all client requests, managing and routing them to the appropriate microservices.

### Config Server

The Config Server centralizes configuration management for all microservices, simplifying application maintenance and consistency across environments.

### Discovery Server

The Discovery Server provides service registration and discovery, enabling seamless service-to-service communication within the microservices ecosystem.

### Student Microservice

The Student Microservice is responsible for managing student-related data and operations, such as adding, updating, and retrieving student records.

### School Microservice

The School Microservice manages school-related data and operations, including adding, updating, and retrieving school records.

## Inter-Service Communication

### Using OpenFeign

This project demonstrates inter-service communication using OpenFeign, a declarative REST client that simplifies service-to-service communication within the microservices ecosystem.

## Client Application
we are displaying views in React.

## Distributed Tracing

### Using Zipkin

The project showcases the use of Zipkin for distributed tracing, enhancing application observability and enabling the visualization and troubleshooting of latency issues.

## React Application:

### Login
![](/images/react-login.png)


### School Page
![](/images/react-school.png)

### Student Page
![](/images/react-student.png)


### Postman API Testing:

![](/images/post-screen1.png)

![](/images/post-screen2.png)


## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).


## Acknowledgements

- [OpenFeign](https://github.com/OpenFeign/feign)
- [Zipkin](https://zipkin.io/)
- [Spring Cloud Netflix](https://spring.io/projects/spring-cloud-netflix)