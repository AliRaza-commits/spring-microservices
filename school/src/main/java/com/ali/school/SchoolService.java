package com.ali.school;

import com.ali.school.client.StudentClient;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository repository;
    private final StudentClient studentClient;

    public void save(School student)
    {
        repository.save(student);
    }

    public School findSchoolById(Integer id)
    {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("School not found"));
    }

    public  School view(Integer id)
    {
        return findSchoolById(id);
    }

    public School updateSchool(Integer id, School school) {
        School schoolRecord = findSchoolById(id);
        schoolRecord.setName(school.name);
        return repository.save(schoolRecord);
    }

    public void deleteSchool(Integer id)
    {
        School school = findSchoolById(id);
        repository.delete(school);
    }

    public Page<School> findAllSchools(Pageable page)
    {
        return repository.findAll(page);
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
