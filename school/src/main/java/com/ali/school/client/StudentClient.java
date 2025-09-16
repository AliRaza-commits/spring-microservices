package com.ali.school.client;

import com.ali.school.Student;
import lombok.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

//, url = "${spring.application.studenturl}"
@FeignClient(name = "student-client")
public interface StudentClient {
    @PostMapping("/school/{school-id}")
    public List<Student> findStudentBySchoolId(@PathVariable("school-id") Integer schoolId);
}
