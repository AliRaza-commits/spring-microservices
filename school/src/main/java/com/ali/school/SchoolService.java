package com.ali.school;

import com.ali.school.client.StudentClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository repository;
    private final StudentClient studentClient;

    public void save(School student)
    {
        repository.save(student);
    }

    public List<School> findAllSchools()
    {
        return repository.findAll();
    }

    public FullSchoolResponse findAllSchoolsWithStudents(Integer schoolId)
    {
        School school = repository.findById(schoolId)
                .orElse(School
                        .builder()
                        .name("Not_found")
                        .build()
                );
        var students = studentClient.findStudentBySchoolId(schoolId);
        return FullSchoolResponse
                .builder()
                .name(school.getName())
                .students(students)
                .build();
    }

}
