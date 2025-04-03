package TapThatBall.app.record;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Record {

    @Id
    private int id;

    private String name;
    private String country;
    private String date;
    private int score;
    private String uniqueId;


    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public String getDate() {
        return date;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public int getScore() {
        return score;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Record record = (Record) o;
        return id == record.id &&
                score == record.score &&
                Objects.equals(name, record.name) &&
                Objects.equals(country, record.country) &&
                Objects.equals(date, record.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, country, date, score);
    }

    @Override
    public String toString() {
        return "Record{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", date='" + date + '\'' +
                ", score=" + score +
                '}';
    }
}

