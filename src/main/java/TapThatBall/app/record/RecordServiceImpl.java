package TapThatBall.app.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    public void save(Record record) {
        recordRepository.findByuniqueId(record.getUniqueId())
                .ifPresentOrElse(existingRecord -> {
                    if (record.getScore() > existingRecord.getScore()) {
                        existingRecord.setName(record.getName());
                        existingRecord.setCountry(record.getCountry());
                        existingRecord.setDate(record.getDate());
                        existingRecord.setScore(record.getScore());
                        recordRepository.save(existingRecord);
                    }
                }, () -> recordRepository.save(record));
    }

    @Override
    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    @Override
    public int getNextId() {
        return 0;
    }
}