package TapThatBall.app.record;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:63342")
public class RecordController {

    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping("/GetId")
    public String GetId() {
        return String.valueOf(recordService.getNextId());
    }

    @PostMapping("/Save")
    @PutMapping
    public void save(@RequestBody Record record) {
        recordService.save(record);
    }
    @GetMapping("/GetTop")
    public List<Record> GetTop() {
        List<Record> records = recordService.findAll();
        return records;
    }

}
