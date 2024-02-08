package com.ali.school.client;

import com.ali.school.Student;
import lombok.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "student-client", url = "${spring.application.studenturl}")
public interface StudentClient {
    @GetMapping("/school/{school-id}")
    public List<Student> findStudentBySchoolId(@PathVariable("school-id") Integer schoolId);
}
