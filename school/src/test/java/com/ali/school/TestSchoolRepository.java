package com.ali.school;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
class TestSchoolRepository {

    @Autowired
    private SchoolRepository schoolRepository;

    @Test
    @DisplayName("Should Save and Fetch By Name")
    @AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
    void testFindByName()
    {
        School school = new School();
        school.setName("Test School");
        schoolRepository.save(school);

        Optional<School> checkSchool = schoolRepository.findByName("Test School");

        assertThat(checkSchool).isPresent();
        assertThat(checkSchool.get().getName()).isEqualTo("Test School");
    }

}