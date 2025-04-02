package TapThatBall.app.record;

import java.util.List;

public interface RecordService {

    public void save(Record record);

    public List<Record> get100TopRecords();

    public int getNextId();
}
