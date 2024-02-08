package com.ali.school;


import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FullSchoolResponse {
    public String name;
    public List<Student> students;
}
