package com.ali.school;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/schools")
public class SchoolController {
    private final SchoolService schoolService;

    @PostMapping("/create")
    public ResponseEntity<Map<String,String>> save(@RequestBody School student)
    {
        schoolService.save(student);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Successfully Created"));
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<School> view(@PathVariable Integer id)
    {
        return ResponseEntity.ok(schoolService.view(id));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<School> update(@PathVariable Integer id, @RequestBody School school)
    {
        return ResponseEntity.ok(schoolService.updateSchool(id,school));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>> delete(@PathVariable Integer id)
    {
        schoolService.deleteSchool(id);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Successfully Deleted Item"));
    }

    @GetMapping("/list")
    public ResponseEntity<Page<School>> list(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "id") String sortBy
    )
    {
        Pageable page = PageRequest.of(pageNumber,
                pageSize, (direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending() ));
        Page<School> schoolPage = schoolService.findAllSchools(page);
        return ResponseEntity.ok(schoolPage);
    }

    @PostMapping("/with-students/{school-id}")
    public ResponseEntity<FullSchoolResponse> schoolWithAllStudent(@PathVariable("school-id") Integer schoolid )
    {
        return ResponseEntity.ok(schoolService.findAllSchoolsWithStudents(schoolid));
    }

}
