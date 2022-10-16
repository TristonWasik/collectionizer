import {
  Button,
  Card,
  Container,
  Divider,
  Input,
  Spacer,
  Text,
} from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { WorkshopItem } from "../helpers/types";
import throttle from "lodash.throttle";

const Home: NextPage = () => {
  // const test = "2809916332";
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [mods, setMods] = useState<WorkshopItem[] | null>(null);
  const [modIds, setModIds] = useState<string[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const getModIds = useMemo(
    () =>
      throttle(async () => {
        try {
          const { data } = await axios.post("api/scrape", { collectionId });
          const wkshpItems: WorkshopItem[] = data.items;

          setMods(wkshpItems);
          setModIds(wkshpItems.map(({ id }) => id));
          setMsg(null);
        } catch (e) {
          setMsg(
            "Mod ID retrieval failed, please check if the collection is set to public!"
          );
        }
      }, 10000),
    [collectionId]
  );

  const handleChange = (e: { target: { value: string } }) => {
    setCollectionId(e.target.value);
  };

  const popItem = (index: number) => {
    if (!mods) return;

    const tempMods = mods;
    tempMods.push(tempMods.splice(index, 1)[0]);
    setMods(tempMods);
    setModIds(tempMods.map(({ id }) => id));
  };

  return (
    <>
      <Head>
        <title>Collectionizer by Elfinslayer</title>
        <meta
          name="description"
          content="A simple tool that gets all of the mod ids out of a steam collection."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        fluid
        css={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className={styles.title}>Collectionizer</h1>

        <Text>
          This tool is used to get the list of mod ids from a steam collection.
          I found it annoying when hosting game servers such as Conan Exiles or
          Space Engineers as they did not allow for the collection id when
          adding mods. This forced you to manually get and enter all mod ids
          from the collection.{" "}
          <b>
            Note: You must have the collection set to public for this tool to
            work!
          </b>
        </Text>
        <Spacer />

        <div className={styles.content}>
          <div className={styles.controls}>
            <Input
              placeholder="Collection Id"
              label="Collection Id"
              onChange={handleChange}
              initialValue={collectionId || ""}
            />
            <Button onClick={getModIds}>Get Mod Ids</Button>
          </div>
          <div className={styles.output}>
            <div className={styles.output_content}>
              <p>Mods:</p>
              {mods &&
                mods.map((item, i) => (
                  <Card key={i.toString()} css={{ marginBottom: "$10" }}>
                    <Card.Body css={{ py: "$10" }}>
                      <Text b>
                        {item.name} ({`${i + 1}/${mods.length}`})
                      </Text>
                      <Text i>By {item.author}</Text>
                      <Text>{item.id}</Text>
                    </Card.Body>
                    <Divider />
                    <Card.Footer>
                      <Button size="sm" onClick={(e) => popItem(i)}>
                        Move to End
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
            </div>
            <div className={styles.output_content}>
              <p>Mod IDs:</p>
              {modIds && <p>{modIds.toString().replaceAll(",", ", ")}</p>}
              {msg && <p>{msg}</p>}
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          Created by: Elfinslayer (2022)
        </footer>
      </Container>
    </>
  );
};

export default Home;
