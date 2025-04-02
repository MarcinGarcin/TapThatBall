package TapThatBall.app.record;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    private final SessionFactory sessionFactory;

    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository, SessionFactory sessionFactory) {
        this.recordRepository = recordRepository;
        this.sessionFactory =  sessionFactory;
    }
    @Override
    public void save(Record record) {
        recordRepository.save(record);
    }

    @Override
    public List<Record> get100TopRecords() {
        return recordRepository.findTop100ByOrderByScoreDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public int getNextId() {
        try (Session session = sessionFactory.openSession()) {
            NativeQuery<Integer> query = session.createNativeQuery("SELECT nextval('hibernate_sequence')", Integer.class);
            Integer nextId = query.uniqueResult();
            return nextId != null ? nextId : 1;
        }
    }
}