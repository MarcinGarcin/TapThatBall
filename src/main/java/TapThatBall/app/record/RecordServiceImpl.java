package TapThatBall.app.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    public void save(Record record) {
        Optional<Record> existingRecordOptional = recordRepository.findByUniqueId(record.getUniqueId());
        if (existingRecordOptional.isPresent()) {
            Record existingRecord = existingRecordOptional.get();
            if (record.getScore() > existingRecord.getScore()) {
                existingRecord.setName(record.getName());
                existingRecord.setCountry(record.getCountry());
                existingRecord.setDate(record.getDate());
                existingRecord.setScore(record.getScore());
                recordRepository.save(existingRecord);
            }
        } else {
            recordRepository.save(record);
        }
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