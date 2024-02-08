package com.ali.school;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Student {
    public String firstName;
    public String lastName;
    public String email;
}
