package com.ali.student;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository repository;
    Logger logger = LoggerFactory.getLogger(StudentService.class);

    public void save(Student student)
    {
        repository.save(student);
    }

    public Student findById(Integer id)
    {
        return repository.findById(id).orElseThrow();
    }

    public Student updateStudent(Integer id, Student student) {
        Student studentRecord = findById(id);
        logger.info(student.toString());
        studentRecord.setFirstName(student.firstName);
        studentRecord.setLastName(student.lastName);
        studentRecord.setEmail(student.email);
        repository.save(studentRecord);
        return studentRecord;
    }

    public void delete(Integer id)
    {
        repository.deleteById(id);
    }

    public Page<Student> findAllStudent(Pageable pageable)
    {
        return repository.findAll(pageable);
    }

    public List<Student> findStudentsWithSchoolId(Integer schoolId)
    {
        return repository.findAllBySchoolId(schoolId);
    }

}
