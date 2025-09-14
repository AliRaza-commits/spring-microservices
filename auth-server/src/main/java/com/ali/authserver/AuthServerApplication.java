package com.ali.authserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}

	//http://localhost:9000/oauth2/authorize?response_type=code&client_id=oidc-client&redirect_uri=http://127.0.0.1:8222/login/oauth2/code/oidc-client&scope=openid+profile

	//http://127.0.0.1:8222/login/oauth2/code/oidc-client?code=SCOfg4kD9itAXmNIDgDnFatFVrjXHx7dkRsljY-QEppoLZ4NZ_m094BPTqu4yhK5Ulil2UKea_rmMzdeSJijPasu5A4CYzoe8IVW6K74OHhIMby6D0EWfhmOv1_uWMWP
	//sqPJM1nH5raCWD71vQZXLimPy0u2BqUJl07xipc8SZpctCQKjQCC0H012xh7NXhyE_2OHDf0k7hKSrWKcxLVxAZqNfAeYlf4CTmuUUJd-ylg85hAQJvDlcRbLUoGEYwg

}
