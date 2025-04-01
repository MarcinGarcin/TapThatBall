package TapThatBall.app.record;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    List<Record> findtop100ByScore(Country country);
}
