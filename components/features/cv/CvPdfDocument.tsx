import path from "path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import type { CV } from "@/lib/types/cv";

// Türkçe karakter (ğ, ü, ş, ı, ö, ç) desteği için Roboto fontu
const robotoRoot = path.join(process.cwd(), "node_modules", "roboto-font", "fonts", "Roboto");
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: path.join(robotoRoot, "roboto-regular-webfont.ttf"),
      fontWeight: 400,
    },
    {
      src: path.join(robotoRoot, "roboto-bold-webfont.ttf"),
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Roboto",
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLeft: { flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  contact: { fontSize: 10, color: "#444" },
  photo: { width: 72, height: 72, borderRadius: 36 },
  sectionTitle: { fontSize: 13, fontWeight: "bold", marginTop: 14, marginBottom: 6 },
  paragraph: { fontSize: 10, color: "#333", marginBottom: 4, lineHeight: 1.4 },
  item: { marginBottom: 10 },
  itemTitle: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  itemSub: { fontSize: 10, color: "#444", marginBottom: 2 },
  itemDate: { fontSize: 9, color: "#666", marginBottom: 2 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 4 },
  skillTag: { fontSize: 9, padding: "4 8", backgroundColor: "#f0f0f0", borderRadius: 4 },
  listItem: { fontSize: 10, marginBottom: 2 },
});

interface CvPdfDocumentProps {
  data: CV;
}

export function CvPdfDocument({ data }: CvPdfDocumentProps) {
  const fullName = [data.name, data.surname].filter(Boolean).join(" ");
  const contactLine = [data.email, data.phone, data.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {fullName ? <Text style={styles.title}>{fullName}</Text> : null}
            {contactLine ? (
              <Text style={styles.contact}>{contactLine}</Text>
            ) : null}
          </View>
          {data.photo_url ? (
            <Image src={data.photo_url} style={styles.photo} />
          ) : null}
        </View>

        {data.summary?.trim() ? (
          <>
            <Text style={styles.sectionTitle}>Özet</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>
          </>
        ) : null}

        {data.education?.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <Text style={styles.itemSub}>
                  {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                </Text>
                <Text style={styles.itemDate}>
                  {edu.start_date} – {edu.end_date}
                </Text>
                {edu.description?.trim() ? (
                  <Text style={styles.paragraph}>{edu.description}</Text>
                ) : null}
              </View>
            ))}
          </>
        ) : null}

        {data.experience?.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>İş Deneyimi</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.company}</Text>
                <Text style={styles.itemSub}>{exp.role}</Text>
                <Text style={styles.itemDate}>
                  {exp.start_date} – {exp.end_date}
                </Text>
                {exp.description?.trim() ? (
                  <Text style={styles.paragraph}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </>
        ) : null}

        {data.skills?.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Yetenekler</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((s) => (
                <Text key={s.id} style={styles.skillTag}>
                  {s.name}
                  {s.level ? ` (${s.level})` : ""}
                </Text>
              ))}
            </View>
          </>
        ) : null}

        {data.certificates?.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Sertifikalar</Text>
            {data.certificates.map((cert) => (
              <View key={cert.id} style={styles.item}>
                <Text style={styles.itemTitle}>{cert.name}</Text>
                <Text style={styles.itemSub}>
                  {cert.issuer}
                  {cert.date ? ` · ${cert.date}` : ""}
                </Text>
              </View>
            ))}
          </>
        ) : null}

        {data.languages?.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Diller</Text>
            <Text style={styles.paragraph}>
              {data.languages
                .map((l) => `${l.name}${l.level ? ` — ${l.level}` : ""}`)
                .join(" · ")}
            </Text>
          </>
        ) : null}

        {data.additional?.trim() ? (
          <>
            <Text style={styles.sectionTitle}>Ek bilgiler</Text>
            <Text style={styles.paragraph}>{data.additional}</Text>
          </>
        ) : null}
      </Page>
    </Document>
  );
}
