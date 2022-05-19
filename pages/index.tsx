import {
  Button,
  Card,
  Container,
  Divider,
  Input,
  Text,
} from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import debounce from "lodash.debounce";
import { WorkshopItem } from "../helpers/types";

const Home: NextPage = () => {
  // const test = "2809916332";
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [mods, setMods] = useState<WorkshopItem[] | null>(null);
  const [modIds, setModIds] = useState<string[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const getModIds = async () => {
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
  };

  const handleChange = (e: { target: { value: string } }) => {
    console.log(collectionId);
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
    <div className={styles.container}>
      <Head>
        <title>Elfinslayer Steam Collection Parser</title>
        <meta
          name="description"
          content="A simple tool that gets all of the mod ids out of a steam collection."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        <h1 className={styles.title}>Elfinslayer's Steam Collection Parser</h1>

        <p className={styles.description}>
          This tool is used to get the list of mod ids from a steam collection.
          I found it annoying when hosting game servers such as Conan Exiles or
          Space Engineers as they did not allow for the collection id when
          adding mods. This forced you to manually get and enter all mod ids
          from the collection.{" "}
          <b>
            Note: You must have the collection set to public for this tool to
            work!
          </b>
        </p>

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
                  <Card id={i.toString()} css={{ marginBottom: "$10" }}>
                    <Card.Body css={{ py: "$10" }}>
                      <Text b>{item.name}</Text>
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
              {msg && <p>msg</p>}
            </div>
          </div>
        </div>
      </Container>

      <footer className={styles.footer}>Created by: Elfinslayer (2022)</footer>
    </div>
  );
};

export default Home;
