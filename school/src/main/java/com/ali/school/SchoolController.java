package com.ali.school;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/schools")
public class SchoolController {
    private final SchoolService schoolService;

    @PostMapping("/save")
    public void save(@RequestBody School student)
    {
        schoolService.save(student);
    }

    @GetMapping("/list")
    public ResponseEntity<List<School>> list()
    {
        return ResponseEntity.ok(schoolService.findAllSchools());
    }

    @GetMapping("/with-students/{school-id}")
    public ResponseEntity<FullSchoolResponse> schoolWithAllStudent(@PathVariable("school-id") Integer schoolid )
    {
        return ResponseEntity.ok(schoolService.findAllSchoolsWithStudents(schoolid));
    }

}
