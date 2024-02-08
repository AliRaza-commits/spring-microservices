package com.ali.student;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/save")
    public void save(@RequestBody Student student)
    {
        studentService.save(student);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Student>> list()
    {
        return ResponseEntity.ok(studentService.findAllStudent());
    }

    @GetMapping("/school/{school-id}")
    public ResponseEntity<List<Student>> findStudentsWithSchoolId(@PathVariable("school-id") Integer schoolId)
    {
        return ResponseEntity.ok(studentService.findStudentsWithSchoolId(schoolId));
    }

}
