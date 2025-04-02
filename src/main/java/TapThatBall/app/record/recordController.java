package TapThatBall.app.record;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class recordController {

    private final RecordServiceImpl recordService;

    public recordController(RecordServiceImpl recordService) {
        this.recordService = recordService;
    }

    @GetMapping("/GetId")
    public String GetId() {
        return String.valueOf(recordService.getNextId());
    }

    @PostMapping("/Save")
    public void save(@RequestBody Record record) {
        recordService.save(record);
    }
    @GetMapping("/GetTop")
    public List<Record> GetTop() {
        return recordService.get100TopRecords();
    }

}
