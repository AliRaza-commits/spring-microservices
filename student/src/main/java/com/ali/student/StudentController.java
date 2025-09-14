package com.ali.student;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/create")
    public void save(@RequestBody Student student)
    {
        studentService.save(student);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Student> view(@PathVariable Integer id)
    {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Student> edit(@PathVariable Integer id,@RequestBody Student student)
    {
        return ResponseEntity.ok(studentService.updateStudent(id,student));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>> delete(@PathVariable Integer id)
    {
        studentService.delete(id);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Deleted Successfully"));
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Student>> list(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "id") String sortBy
    )
    {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending(): Sort.by(sortBy).ascending());
        Page<Student> studentPage = studentService.findAllStudent(pageable);
        return ResponseEntity.ok(studentPage);
    }

    @PostMapping("/school/{school-id}")
    public ResponseEntity<List<Student>> findStudentsWithSchoolId(@PathVariable("school-id") Integer schoolId)
    {
        return ResponseEntity.ok(studentService.findStudentsWithSchoolId(schoolId));
    }

}
