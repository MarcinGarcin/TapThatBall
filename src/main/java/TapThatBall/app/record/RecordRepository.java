package TapThatBall.app.record;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Integer> {
    Optional<Record> findByUniqueId(String uniqueId);

    //todo add returning certain amount of records
}
